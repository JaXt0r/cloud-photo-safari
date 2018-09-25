package de.mdaehner.cloud_photo_safari.controller.flickr;

import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Controller
@RestController
class WebhookController {


  @RequestMapping("webhook")
  public String callFromHook() {
    greeting();
    return "Hook called";
  }



  @SendTo("/webhook/inform")
  public String greeting() {
    return "Foobar";
  }

}
