package de.mdaehner.cloud_photo_safari.model

import com.googlecode.jmapper.annotations.JGlobalMap
import com.googlecode.jmapper.annotations.JMap


@JGlobalMap
class PhotosetData {

    lateinit var title: String
    lateinit var primaryPhoto: PhotoData

}