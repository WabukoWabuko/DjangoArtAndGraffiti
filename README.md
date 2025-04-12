# DjangoArtAndGraffiti

Modified version of <a href="https://github.com/WabukoWabuko/Art_Advert_Website">this</a>. Here is the look of <a href="https://wabukowabuko.github.io/Art_Advert_Website/">UI</a>

Landing page with ReactJS and Django
<img src="Project/Screenshot at 2025-02-28 11-24-07.png" alt="Landing Page">

A platform for showcasing graffiti and street art, built with Django, ReactJS, and SQLite3.

## Authentication Workflow

The following flowchart illustrates the admin login process via API:

```mermaid
flowchart TD
    A[React Frontend: Admin Visits /admin-login] --> B[User Enters Username & Password]
    B --> C[POST Request to /api/admin-login/]
    C --> D{Is User Staff?}
    D -- Yes --> E[Login Successful: Returns User Data]
    E --> F[React Redirects to Admin Dashboard]
    D -- No --> G[Returns Error: Invalid Credentials]
    G --> B
