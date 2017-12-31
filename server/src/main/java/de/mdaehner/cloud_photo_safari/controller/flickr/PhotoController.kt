package de.mdaehner.cloud_photo_safari.controller.flickr

import com.flickr4java.flickr.photos.PhotosInterface
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/photo/")
class PhotoController: AbstractFlickrController() {

    private val photosIntface: PhotosInterface by lazy { flickrService.flickr.photosInterface }


    @RequestMapping("urls/{id}")
    fun getUrls(@PathVariable("id") id: String): Map<String, String> {
        val photo = photosIntface.getPhoto(id)

        return mapOf(
                "original" to photo.originalUrl,
                "thumbnail" to photo.thumbnailUrl,
                "large" to photo.largeUrl,
                "large2048" to photo.large2048Url,
                "large1600" to photo.large1600Url,
                "medium" to photo.mediumUrl,
                "small" to photo.smallUrl,
                "smallSquare" to photo.smallSquareUrl,
                "small320" to photo.small320Url)
    }

}