package de.mdaehner.cloud_photo_safari.interceptor;

import com.flickr4java.flickr.RequestContext;
import de.mdaehner.cloud_photo_safari.service.FlickrService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
public class FlickrInterceptor extends HandlerInterceptorAdapter {

  @Autowired
  private FlickrService flickrService;

  @Override
  public boolean preHandle(HttpServletRequest request,
                           HttpServletResponse response, Object handler) throws Exception {

    RequestContext.getRequestContext().setAuth(flickrService.getAuthStore().retrieve(flickrService.getNsid()));

    return super.preHandle(request, response, handler);
  }
}
