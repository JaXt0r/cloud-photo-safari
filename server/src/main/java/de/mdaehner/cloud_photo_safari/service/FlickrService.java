package de.mdaehner.cloud_photo_safari.service;

import com.flickr4java.flickr.Flickr;
import com.flickr4java.flickr.FlickrException;
import com.flickr4java.flickr.REST;
import com.flickr4java.flickr.RequestContext;
import com.flickr4java.flickr.util.AuthStore;
import com.flickr4java.flickr.util.FileAuthStore;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.io.File;

@Service
public class FlickrService {

  private Flickr flickr;
  private String nsid;
  private AuthStore authStore;


  {
    String apiKey = System.getProperty("flickr.api.key");
    String sharedSecret = System.getProperty("flickr.api.secret");
    nsid = System.getProperty("flickr.api.nsid");
    flickr = new Flickr(apiKey, sharedSecret, new REST());

    try {
      authStore = new FileAuthStore(new File(".flickrAuth"));

      if (null != authStore.retrieve(nsid)) {
        RequestContext.getRequestContext().setAuth(authStore.retrieve(nsid));
      }
    } catch (FlickrException e) {
      throw new IllegalArgumentException(e);
    }
  }



  public String getNsid() {
    return nsid;
  }

  public Flickr getFlickr() {
    return flickr;
  }

  public AuthStore getAuthStore() {
    return authStore;
  }

}
