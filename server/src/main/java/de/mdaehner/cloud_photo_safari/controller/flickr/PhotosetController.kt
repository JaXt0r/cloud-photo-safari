package de.mdaehner.cloud_photo_safari.controller.flickr

import com.flickr4java.flickr.photos.PhotosInterface
import com.flickr4java.flickr.photosets.Photoset
import com.flickr4java.flickr.photosets.PhotosetsInterface
import de.mdaehner.cloud_photo_safari.jmap
import de.mdaehner.cloud_photo_safari.model.PhotoURLsData
import de.mdaehner.cloud_photo_safari.model.PhotosetData
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController


@RestController
@RequestMapping("/photoset/")
class PhotosetController : AbstractFlickrController() {

    private val photosets: PhotosetsInterface by lazy { flickrService.flickr.photosetsInterface }
    private val photosIntface: PhotosInterface by lazy { flickrService.flickr.photosInterface }


    @RequestMapping("list")
    fun foo(): List<PhotosetData> {
        var response = photosets.getList(nsid).photosets.jmap(Photoset::class.java, PhotosetData::class.java)

        // Adding image URLs with additional flickr-request
        response.forEach {
            val photo = photosIntface.getPhoto(it.primaryPhoto.id)
            it.primaryPhoto.urls = PhotoURLsData(photo.originalUrl, photo.thumbnailUrl,
                    photo.largeUrl, photo.large2048Url, photo.large1600Url,
                    photo.mediumUrl,
                    photo.smallUrl, photo.smallSquareUrl, photo.small320Url)
        }

        return response
    }
}