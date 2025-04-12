# DjangoArtAndGraffiti

Modified version of <a href="https://github.com/WabukoWabuko/Art_Advert_Website">this</a>. Here is the look of <a href="https://wabukowabuko.github.io/Art_Advert_Website/">UI</a>

Landing page with ReactJS and Django
<img src="Project/Screenshot at 2025-02-28 11-24-07.png" alt="Landing Page">

A platform for showcasing graffiti and street art, built with Django, ReactJS, and SQLite3.

## Authentication Workflow

The following flowchart illustrates the admin login process:

```mermaid
flowchart TD
    A[User Visits /admin-login/] --> B[Enters Username & Password]
    B --> C{Is User Staff?}
    C -- Yes --> D[Login Successful]
    D --> E[Redirect to Admin Dashboard]
    C -- No --> F[Show Error: Invalid Credentials]
    F --> A
