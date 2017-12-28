package de.mdaehner.cloud_photo_safari.controller.flickr

import com.flickr4java.flickr.photosets.Photosets
import com.flickr4java.flickr.photosets.PhotosetsInterface
import de.mdaehner.cloud_photo_safari.service.FlickrService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/photosets/")
class PhotosetsController {

    @Autowired
    lateinit var flickrService: FlickrService

    val photosets: PhotosetsInterface by lazy { flickrService.flickr.photosetsInterface }
    val nsid by lazy { flickrService.nsid }


    @RequestMapping("list")
    fun foo() = photosets.getList(nsid).photosets //photosets.getList(nsid)
}