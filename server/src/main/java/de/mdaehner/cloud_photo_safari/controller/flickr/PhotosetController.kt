package de.mdaehner.cloud_photo_safari.controller.flickr

import com.flickr4java.flickr.photos.PhotosInterface
import com.flickr4java.flickr.photosets.Photoset
import com.flickr4java.flickr.photosets.PhotosetsInterface
import de.mdaehner.cloud_photo_safari.jmap
import de.mdaehner.cloud_photo_safari.model.PhotoURLsData
import de.mdaehner.cloud_photo_safari.model.PhotosetData
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController


@RestController
@RequestMapping("/photoset/")
class PhotosetController : AbstractFlickrController() {

    private val photosets: PhotosetsInterface by lazy { flickrService.flickr.photosetsInterface }
    private val photosIntface: PhotosInterface by lazy { flickrService.flickr.photosInterface }


    @RequestMapping("list")
    fun getList(): List<PhotosetData> {
        var photosets = photosets.getList(nsid, "url_o").photosets

        var response = photosets.jmap(Photoset::class.java, PhotosetData::class.java)

        // Manually map the URLs, because JMapper requires the values as properties, but only getter exists.
        response.map {
            val convertedId = it.id
            val photo = photosets.firstOrNull { convertedId == it.id }?.primaryPhoto
            it.primaryPhoto.urls = PhotoURLsData(
                    photo?.originalUrl,
                    photo?.thumbnailUrl,
                    photo?.largeUrl,
                    photo?.large2048Url,
                    photo?.large1600Url,
                    photo?.mediumUrl,
                    photo?.smallUrl,
                    photo?.smallSquareUrl,
                    photo?.small320Url)
        }

        return response
    }
}