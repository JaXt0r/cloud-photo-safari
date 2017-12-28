package de.mdaehner.cloud_photo_safari.controller;

import com.flickr4java.flickr.Flickr;
import com.flickr4java.flickr.FlickrException;
import com.flickr4java.flickr.REST;
import com.flickr4java.flickr.RequestContext;
import com.flickr4java.flickr.auth.Auth;
import com.flickr4java.flickr.auth.AuthInterface;
import com.flickr4java.flickr.auth.Permission;
import com.flickr4java.flickr.util.AuthStore;
import com.flickr4java.flickr.util.FileAuthStore;
import com.flickr4java.flickr.util.IOUtilities;
import de.mdaehner.cloud_photo_safari.service.FlickrService;
import org.scribe.model.Token;
import org.scribe.model.Verifier;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.websocket.server.PathParam;
import java.io.File;
import java.io.IOException;

@RestController
public class IndexController {

  @Autowired
  private FlickrService flickrService;



  @RequestMapping("/getGalleries")
  public String getGalleries() throws FlickrException {
    Object o2 = flickrService.getFlickr().getPhotosetsInterface().getList(flickrService.getNsid());

    return "";
  }

}