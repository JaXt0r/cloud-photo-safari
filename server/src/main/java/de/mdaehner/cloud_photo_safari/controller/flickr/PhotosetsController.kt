package de.mdaehner.cloud_photo_safari.controller.flickr

import com.flickr4java.flickr.photosets.Photoset
import com.flickr4java.flickr.photosets.PhotosetsInterface
import com.googlecode.jmapper.JMapper
import com.googlecode.jmapper.conversions.explicit.ConversionPlaceholder.destination
import de.mdaehner.cloud_photo_safari.jmap
import de.mdaehner.cloud_photo_safari.model.PhotosetData
import de.mdaehner.cloud_photo_safari.service.FlickrService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import javax.print.attribute.standard.Destination


@RestController
@RequestMapping("/photosets/")
class PhotosetsController {

    @Autowired
    lateinit var flickrService: FlickrService

    val photosets: PhotosetsInterface by lazy { flickrService.flickr.photosetsInterface }
    val nsid by lazy { flickrService.nsid }


    @RequestMapping("list")
    fun foo(): List<PhotosetData> {
        return photosets.getList(nsid).photosets.jmap(Photoset::class.java, PhotosetData::class.java)
    }
}