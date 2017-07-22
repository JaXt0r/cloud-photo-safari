# cloud-picture-frame

Playground to create a Raspberry PI solution which can:
* Server: NodeJS
* Commandline: Gdrive
* Cloudspace: Google Drive (15 GB free)
* Client: Angular2


Workflow:
1. PC boots with chromium in Fullscreen mode with
2. a url like localhost/picture_frame
3. The page will call itself every 5 minutes (for requesting a new image)
4. Server side is nodejs which calls Gdrive
5. Gdrive reads all files in a dedicated folder and
6. nodejs will select one of this names randomized
7. Gdrive will now return the public URL which will be sent to client
8. Client takes this URL and will show the image


Some ideas:
* http://thejackalofjavascript.com/developing-a-mean-app-with-angular-2-0/
