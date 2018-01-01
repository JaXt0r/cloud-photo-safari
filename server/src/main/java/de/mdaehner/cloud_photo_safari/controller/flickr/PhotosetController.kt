package de.mdaehner.cloud_photo_safari.controller.flickr

import com.flickr4java.flickr.photos.Photo
import com.flickr4java.flickr.photos.PhotosInterface
import com.flickr4java.flickr.photosets.Photoset
import com.flickr4java.flickr.photosets.PhotosetsInterface
import de.mdaehner.cloud_photo_safari.jmap
import de.mdaehner.cloud_photo_safari.model.PhotoData
import de.mdaehner.cloud_photo_safari.model.PhotoURLsData
import de.mdaehner.cloud_photo_safari.model.PhotosetData
import org.apache.commons.lang3.RandomUtils
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController


@RestController
@RequestMapping("/photoset/")
class PhotosetController : AbstractFlickrController() {

    private val photosetsIntface: PhotosetsInterface by lazy { flickrService.flickr.photosetsInterface }
    private val photosIntface: PhotosInterface by lazy { flickrService.flickr.photosInterface }


    @RequestMapping("list")
    fun getList(): List<PhotosetData> {
        var photosets = photosetsIntface.getList(nsid, "url_o").photosets

        var response = photosets.jmap(Photoset::class.java, PhotosetData::class.java)
        appendPhotoURLs(response, photosets)

        return response
    }


    @RequestMapping("randomPhoto/{photosetId}")
    fun getRandomPhoto(@PathVariable("photosetId")  photosetId: String): PhotoData {
        val photoset = photosetsIntface.getInfo(photosetId)
        val randomIndex = RandomUtils.nextInt(0, photoset.photoCount)
        val photo = photosetsIntface.getPhotos(photoset.id, 1, randomIndex).first()

        var photoData = photo.jmap(Photo::class.java, PhotoData::class.java)

        appendPhotoURLs(photoData, photo)

        return photoData
    }


    /**
     * Manually map the URLs, because JMapper requires the values as properties, but only getter exists.
     */
    private fun appendPhotoURLs(photosetsData: List<PhotosetData>, photosets: MutableCollection<Photoset>) {
        photosetsData.map {
            val convertedId = it.id
            val photo = photosets.first { convertedId == it.id }
            appendPhotoURLs(it.primaryPhoto, photo.primaryPhoto)
        }

    }

    /**
     * Manually map the URLs, because JMapper requires the values as properties, but only getter exists.
     */
    private fun appendPhotoURLs(photoData: PhotoData, photo: Photo) {
        photoData.urls = PhotoURLsData(
                photo.originalUrl,
                photo.thumbnailUrl,
                photo.largeUrl,
                photo.large2048Url,
                photo.large1600Url,
                photo.mediumUrl,
                photo.smallUrl,
                photo.smallSquareUrl,
                photo.small320Url)
    }
}