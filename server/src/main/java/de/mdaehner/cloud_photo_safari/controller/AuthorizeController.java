package de.mdaehner.cloud_photo_safari.controller;

import com.flickr4java.flickr.FlickrException;
import com.flickr4java.flickr.RequestContext;
import com.flickr4java.flickr.auth.Auth;
import com.flickr4java.flickr.auth.AuthInterface;
import com.flickr4java.flickr.auth.Permission;
import de.mdaehner.cloud_photo_safari.service.FlickrService;
import org.scribe.model.Token;
import org.scribe.model.Verifier;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

/**
 * Authorize app to be used by my user.
 *
 * Hints:
 *   * Must be called only once per app. (normally)
 *   * But after a year (2017-208) I need to called it again.
 */
@RestController
@RequestMapping("/authorize/")
public class AuthorizeController {

  @Autowired
  private FlickrService flickrService;


  private Token requestToken;
  private Token accessToken;


  /**
   * Ask for login code
   */
  @RequestMapping("1")
  public String authorize1() {
    AuthInterface authInterface = flickrService.getFlickr().getAuthInterface();

    this.requestToken = authInterface.getRequestToken();

    String url = authInterface.getAuthorizationUrl(requestToken, Permission.DELETE);

    return String.format("<a href=\"%s\" target=\"_blank\">%s</a>", url, url);
  }


  /**
   * Paste the return code into this URL.
   */
  @RequestMapping("2/{authorizeToken}")
  public void authorize2(@PathVariable("authorizeToken") String authorizeToken) throws FlickrException, IOException {
    AuthInterface authInterface = flickrService.getFlickr().getAuthInterface();

    this.accessToken = authInterface.getAccessToken(this.requestToken, new Verifier(authorizeToken));
    System.out.println("Authentication success");

    Auth auth = authInterface.checkToken(accessToken);
    RequestContext.getRequestContext().setAuth(auth);
    flickrService.getAuthStore().store(auth);


    // This token can be used until the user revokes it.
    System.out.println("Token: " + accessToken.getToken());
    System.out.println("Secret: " + accessToken.getSecret());
    System.out.println("nsid: " + auth.getUser().getId());
    System.out.println("Realname: " + auth.getUser().getRealName());
    System.out.println("Username: " + auth.getUser().getUsername());
    System.out.println("Permission: " + auth.getPermission().getType());
  }

}
