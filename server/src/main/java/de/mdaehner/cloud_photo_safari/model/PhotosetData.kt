package de.mdaehner.cloud_photo_safari.model

import com.googlecode.jmapper.annotations.JGlobalMap


@JGlobalMap
class PhotosetData {

    lateinit var id: String
    lateinit var title: String
    lateinit var photoCount: Integer
    lateinit var primaryPhoto: PhotoData

}