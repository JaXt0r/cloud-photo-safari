package de.mdaehner.cloud_photo_safari

import com.googlecode.jmapper.JMapper


fun <T, U> MutableCollection<T>.jmap(source: Class<T>, destination: Class<U>): List<U> {
    val mapper = JMapper(destination, source)

    return this.map { mapper.getDestination(it) }
}
