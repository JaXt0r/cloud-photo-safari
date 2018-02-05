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
        val photoset = photosetsIntface.getInfo(photosetId)
        var randomIndex: Int

        // Don't deliver original photo again.
        do {
            // Index is from 1...n
            randomIndex = RandomUtils.nextInt(1, photoset.photoCount + 1)
        } while (prevPhotosetIndex == randomIndex && photoset.photoCount > 1)

        val photo = photosetsIntface.getPhotos(photoset.id, 1, randomIndex).first()

        var photoData = photo.jmap(Photo::class.java, PhotoData::class.java)

        appendAllPhotoSizes(photoData)
        photoData.photosetIndex = randomIndex

        return photoData
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
