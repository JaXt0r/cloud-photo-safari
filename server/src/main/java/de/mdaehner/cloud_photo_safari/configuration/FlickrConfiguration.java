package de.mdaehner.cloud_photo_safari.configuration;

import de.mdaehner.cloud_photo_safari.interceptor.FlickrInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
public class FlickrConfiguration extends WebMvcConfigurerAdapter {

  @Autowired
  private FlickrInterceptor interceptor;

  @Override
  public void addInterceptors(InterceptorRegistry registry) {
    registry.addInterceptor(interceptor);
  }

}
