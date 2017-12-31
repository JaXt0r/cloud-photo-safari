package de.mdaehner.cloud_photo_safari.model

import com.googlecode.jmapper.annotations.JGlobalMap


@JGlobalMap(excluded = ["urls"])
class PhotoData {
    lateinit var id: String

    lateinit var urls: PhotoURLsData
}


/**
 * Manually filled with an extra request.
 * No automatic mapping a.t.m.
 */
data class PhotoURLsData(val original: String?, val thumbnail: String?,
                         val large: String?, val large2048: String?, val large1600: String?,
                         val medium: String?,
                         val small: String?, val smallSquare: String?, val small320: String?)
