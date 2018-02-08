package de.mdaehner.cloud_photo_safari.controller.flickr

import com.flickr4java.flickr.photos.Photo
import com.flickr4java.flickr.photos.PhotosInterface
import com.flickr4java.flickr.photosets.Photoset
import com.flickr4java.flickr.photosets.PhotosetsInterface
import de.mdaehner.cloud_photo_safari.jmap
import de.mdaehner.cloud_photo_safari.model.PhotoData
import de.mdaehner.cloud_photo_safari.model.PhotoSize
import de.mdaehner.cloud_photo_safari.model.PhotosetData
import org.apache.commons.lang3.RandomUtils
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController


@RestController
@RequestMapping("/photoset/")
class PhotosetController : AbstractFlickrController() {


    /**
     * Taken from:
     * @see com.flickr4java.flickr.photos.Size.lstSizes
     * @see https://www.flickr.com/services/api/misc.urls.html
     */
    private val SIZE_LABELS: Array<String> = arrayOf("Thumbnail", "Square", "Small", "Medium", "Large", "Original", "Large Square", "Small 320", "Medium 640", "Medium 800", "Large 1600", "Large 2048", "Site MP4", "Video Player", "Video Original", "Mobile MP4", "HD MP4")


    private val photosetsIntface: PhotosetsInterface by lazy { flickrService.flickr.photosetsInterface }
    private val photosIntface: PhotosInterface by lazy { flickrService.flickr.photosInterface }


    @RequestMapping("list")
    fun getList(): List<PhotosetData> {
        var photosets = photosetsIntface.getList(nsid, "url_q").photosets

        var response = photosets.jmap(Photoset::class.java, PhotosetData::class.java)

        // Add URL from response. Don't load all sizes manually because everz photoset would generate another call.
        response.forEach {
            val convertedPhoto = it
            val origPhoto = photosets.first { it.id == convertedPhoto.id }.primaryPhoto

            convertedPhoto.primaryPhoto.sizes.put("large_square", PhotoSize("Square Large", origPhoto.squareLargeUrl, origPhoto.squareLargeSize.height, origPhoto.squareLargeSize.width))
        }

        return response
    }


    @RequestMapping("randomPhoto/{photosetId}/{prevPhotosetIndex}")
    fun getRandomPhoto(@PathVariable("photosetId") photosetId: String, @PathVariable("prevPhotosetIndex") prevPhotosetIndex: Int): PhotoData {
        return getImage(photosetId, prevPhotosetIndex, isShuffle = true)
    }


    @RequestMapping("prevPhoto/{photosetId}/{prevPhotosetIndex}")
    fun getPrevPhoto(@PathVariable("photosetId") photosetId: String, @PathVariable("prevPhotosetIndex") prevPhotosetIndex: Int): PhotoData {
        return getImage(photosetId, prevPhotosetIndex, isPrev = true)
    }

    @RequestMapping("nextPhoto/{photosetId}/{prevPhotosetIndex}")
    fun getNextPhoto(@PathVariable("photosetId") photosetId: String, @PathVariable("prevPhotosetIndex") prevPhotosetIndex: Int): PhotoData {
        return getImage(photosetId, prevPhotosetIndex)
    }


    private fun getImage(photosetId: String, prevIndex: Int, isShuffle: Boolean = false, isPrev: Boolean = false): PhotoData {
        val photoset = photosetsIntface.getInfo(photosetId)
        var index = getIndex(prevIndex, photoset.photoCount, isShuffle, isPrev)

        val photo = photosetsIntface.getPhotos(photoset.id, 1, index).first()

        var photoData = photo.jmap(Photo::class.java, PhotoData::class.java)

        appendAllPhotoSizes(photoData)
        photoData.photosetIndex = index

        return photoData
    }


    private fun getIndex(prevIndex: Int, photoCount: Int, shuffle: Boolean, prev: Boolean): Int {
        var newIndex: Int

        if (prev) {
            if (prevIndex <= 1) {
                newIndex = photoCount
            } else {
                newIndex = prevIndex-1
            }
        } else if (shuffle) {
            // Don't deliver original photo again.
            do {
                // Index is from 1...n
                newIndex = RandomUtils.nextInt(1, photoCount + 1)
            } while (prevIndex == newIndex && photoCount > 1)
        } else {
            newIndex = if (prevIndex == photoCount) 1 else (prevIndex + 1)
        }

        return newIndex
    }


    /**
     * Manually map the URLs, because we want some customizings.
     * Unfortunately some URLs like 1600px won't be loaded by the initial call. So this method comes to the rescure and loads all! image sizes.
     */
    private fun appendAllPhotoSizes(photoData: PhotoData) {
        val sizes = photosIntface.getSizes(photoData.id)

        sizes.forEach({
            photoData.sizes.put(
                    SIZE_LABELS[it.label].toLowerCase().replace(" ", "_"), // nice looking key
                    PhotoSize(SIZE_LABELS[it.label], it.source, it.height, it.width))
        })
    }
}
