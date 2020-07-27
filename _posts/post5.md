---
title: Cross-Origin Resource Sharing (CORS)
created: '2019-06-04T12:31:54.633Z'
modified: '2019-06-10T10:29:07.187Z'
tags: [FrontEnd/HTTP, Introduction]
---

# Cross-Origin Resource Sharing (CORS)

Cross-Origin Resource Sharing (CORS) is a mechanism that uses additional HTTP headers to tell browsers to give a web application running at one origin, access to selected resources from a different origin. A web application executes a cross-origin HTTP request when it requests a resource that has a different origin (domain, protocol, or port) from its own.

An example of a cross-origin request: the front-end JavaScript code served from https://domain-a.com uses XMLHttpRequest to make a request for https://domain-b.com/data.json.

For security reasons, browsers restrict cross-origin HTTP requests initiated from scripts. For example, XMLHttpRequest and the Fetch API follow the same-origin policy. This means that a web application using those APIs can only request resources from the same origin the application was loaded from unless the response from other origins includes the right CORS headers.

The CORS mechanism supports secure cross-origin requests and data transfers between browsers and servers. Modern browsers use CORS in APIs such as XMLHttpRequest or Fetch to mitigate the risks of cross-origin HTTP requests.

## Who should read this article?

Everyone, really.

More specifically, this article is for web administrators, server developers, and front-end developers. Modern browsers handle the client side of cross-origin sharing, including headers and policy enforcement. But the CORS standard means servers have to handle new request and response headers. Another article for server developers discussing cross-origin sharing from a server perspective (with PHP code snippets) is supplementary reading.

## What requests use CORS?

This cross-origin sharing standard can enable cross-site HTTP requests for:

- Invocations of the XMLHttpRequest or Fetch APIs, as discussed above.
- Web Fonts (for cross-domain font usage in @font-face within CSS), so that servers can deploy TrueType fonts that can only be cross-site loaded and used by web sites that are permitted to do so.
- WebGL textures.
- Images/video frames drawn to a canvas using drawImage().
- CSS Shapes from images.

This article is a general discussion of Cross-Origin Resource Sharing and includes a discussion of the necessary HTTP headers.

## Functional overview

The Cross-Origin Resource Sharing standard works by adding new HTTP headers that let servers describe which origins are permitted to read that information from a web browser. Additionally, for HTTP request methods that can cause side-effects on server data (in particular, HTTP methods other than GET, or POST with certain MIME types), the specification mandates that browsers "preflight" the request, soliciting supported methods from the server with the HTTP OPTIONS request method, and then, upon "approval" from the server, sending the actual request. Servers can also inform clients whether "credentials" (such as Cookies and HTTP Authentication) should be sent with requests.

CORS failures result in errors, but for security reasons, specifics about the error are not available to JavaScript. All the code knows is that an error occurred. The only way to determine what specifically went wrong is to look at the browser's console for details.

Subsequent sections discuss scenarios, as well as provide a breakdown of the HTTP headers used.

