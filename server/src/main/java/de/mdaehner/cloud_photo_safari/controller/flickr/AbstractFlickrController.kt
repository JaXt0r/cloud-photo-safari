package de.mdaehner.cloud_photo_safari.controller.flickr

import de.mdaehner.cloud_photo_safari.service.FlickrService
import org.springframework.beans.factory.annotation.Autowired

abstract class AbstractFlickrController {


    @Autowired
    lateinit var flickrService: FlickrService


    val nsid by lazy { flickrService.nsid }


}