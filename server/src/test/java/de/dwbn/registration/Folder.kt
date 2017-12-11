package de.dwbn.registration

import org.apache.jackrabbit.ocm.mapper.impl.annotation.Field
import org.apache.jackrabbit.ocm.mapper.impl.annotation.Node

@Node(jcrType = "mgnl:content")
class Folder {

    @Field(jcrName = "mgnl:createdBy")
    var createdBy = ""

    @Field(path = true)
    var path = ""
}