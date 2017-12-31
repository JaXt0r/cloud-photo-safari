package de.mdaehner.cloud_photo_safari.controller.flickr

import com.flickr4java.flickr.photosets.Photoset
import com.flickr4java.flickr.photosets.PhotosetsInterface
import de.mdaehner.cloud_photo_safari.jmap
import de.mdaehner.cloud_photo_safari.model.PhotosetData
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController


@RestController
@RequestMapping("/photoset/")
class PhotosetController : AbstractFlickrController() {

    private val photosets: PhotosetsInterface by lazy { flickrService.flickr.photosetsInterface }


    @RequestMapping("list")
    fun foo(): List<PhotosetData> {
        return photosets.getList(nsid).photosets.jmap(Photoset::class.java, PhotosetData::class.java)
    }
}