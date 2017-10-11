package de.dwbn.registration;

import org.apache.jackrabbit.commons.JcrUtils;
import org.apache.jackrabbit.ocm.manager.ObjectContentManager;
import org.apache.jackrabbit.ocm.manager.impl.ObjectContentManagerImpl;
import org.apache.jackrabbit.ocm.mapper.Mapper;
import org.apache.jackrabbit.ocm.mapper.impl.annotation.AnnotationMapperImpl;
import org.junit.Ignore;
import org.junit.Test;

import javax.jcr.Node;
import javax.jcr.Repository;
import javax.jcr.Session;
import javax.jcr.SimpleCredentials;
import java.util.ArrayList;
import java.util.List;

@Ignore
public class JackrabbitTest {

  @Test
  public void testConnection() throws Exception {
    Repository repository = JcrUtils.getRepository("http://127.0.0.1:8080/.davex");
    SimpleCredentials creds = new SimpleCredentials("superuser", "superuser".toCharArray());

    Session session = repository.login(creds, "website");

    try {
      Node root = session.getRootNode();

      // Retrieve content
      Node node = root.getNode("articles-app");
      ObjectContentManager ocm = getOCM(session);
      System.out.println(node.getPath());
      System.out.println(node.getProperty("jcr:uuid").getString());

      Folder folder = (Folder) ocm.getObjectByUuid("e47155fd-88e3-74df-8bdd-59d2f55857cc");
      System.out.println(folder.getCreatedBy());


      folder.setCreatedBy("mda" + System.currentTimeMillis());
      ocm.update(folder);
      ocm.save();


    } finally {
      session.logout();
    }
  }


  /**
   * @param session
   * @return
   * @see http://jackrabbit.apache.org/jcr/ocm/object-content-manager.html
   */
  private ObjectContentManager getOCM(Session session) {
    // Register the persistent classes
    List<Class> classes = new ArrayList<>();
    classes.add(Folder.class);
//    classes.add(Author.class);
//    classes.add(Url.class);

    Mapper mapper = new AnnotationMapperImpl(classes);
    return new ObjectContentManagerImpl(session, mapper);
  }

}
