package de.mdaehner.cloud_photo_safari

import com.googlecode.jmapper.JMapper
import com.googlecode.jmapper.conversions.explicit.ConversionPlaceholder.destination
import com.googlecode.jmapper.conversions.explicit.ConversionPlaceholder.source


fun <T, U> MutableCollection<T>.jmap(source: Class<T>, destination: Class<U>): List<U> {
    val mapper = JMapper(destination, source)

    return this.map { mapper.getDestination(it) }
}

fun <T, U> T.jmap(source: Class<T>, destination: Class<U>): U {
    val mapper = JMapper(destination, source)

    return mapper.getDestination(this)
}