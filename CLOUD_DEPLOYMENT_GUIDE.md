Cloud Volunteer Recruitment — Task 2

Reproducible Website Deployment Guide

Author: Om Suresh Pansare
Course: B.Tech Computer Science, VIT Pune
Hosting Platform: GitHub Pages
Project: Personal Portfolio Website

1. Project Overview

This project is a personal portfolio website built using HTML5, CSS3, and vanilla JavaScript. It is part of my first-year web development recruitment tasks.

The purpose of this guide is to explain how another person can publish the portfolio website using GitHub Pages.

2. Technologies Used

- HTML5 — website structure
- CSS3 — styling, responsive layouts, and animations
- Vanilla JavaScript — interactive functionality
- Git — version control
- GitHub — source-code repository and workflow management
- GitHub Pages — static website hosting
- GitHub Actions — automated deployment

3. Prerequisites

Before starting, ensure that you have:

- A GitHub account
- Access to the project repository
- A modern web browser
- A portfolio folder containing "index.html", CSS, JavaScript, and any required assets
- Permission to configure GitHub Pages and GitHub Actions for the repository

No paid cloud server or backend database is required for this static website.

4. Repository Structure

The repository contains the following projects:

- "portfolio/" — personal portfolio website
- "landing-clone/" — SaaS landing-page clone
- "todo-app/" — interactive to-do application
- "README.md" — project overview and instructions

The deployment workflow will publish only the "portfolio/" directory.

5. Deployment Procedure

Step 1: Open the Repository

Visit:

https://github.com/ompansare584-rgb/aws-web-development-recruitment

Confirm that the portfolio source files are available in the "portfolio/" directory.

Step 2: Verify the Entry File

Check that the portfolio directory contains an "index.html" file. Verify that its CSS, JavaScript, images, and other assets use correct file paths.

Step 3: Configure GitHub Pages

1. Open the repository on GitHub.
2. Navigate to Settings → Pages.
3. Under Build and deployment, select GitHub Actions as the source.

Step 4: Create a Deployment Workflow

Create the following file in the repository:

".github/workflows/deploy.yml"

The workflow must check out the repository, copy or select the contents of the "portfolio/" directory as the deployment artifact, and publish that artifact using GitHub Pages.

The uploaded artifact must contain "index.html" at its top level. Refer to the official GitHub Pages documentation for the current workflow syntax and required permissions.

Official documentation:

https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site

Step 5: Commit the Workflow

Save and commit the workflow file to the "main" branch.

Step 6: Monitor Deployment

1. Open the repository's Actions tab.
2. Select the latest deployment workflow run.
3. Review the logs for errors.
4. Wait for the workflow to complete successfully.

Step 7: Verify the Website

After a successful deployment, open the website URL shown in the GitHub Pages settings or deployment summary.

Verify that:

- The home page loads correctly.
- CSS styling and images appear correctly.
- JavaScript interactions work.
- Navigation links function correctly.
- The layout works on desktop and mobile screens.

6. Setup and Configuration Requirements

- The deployment artifact must contain the portfolio website's "index.html" at its root.
- All referenced CSS, JavaScript, and image files must be included.
- Relative paths should be checked to ensure assets load correctly.
- GitHub Actions must have the required permissions to publish the website.
- The repository's Pages source must be set to GitHub Actions.

7. Live Website URL

Status: Not deployed yet.

The live URL will be added after a successful deployment and verification.

8. Troubleshooting

Website displays a 404 error: Check that "index.html" exists at the root of the uploaded artifact.

CSS or images are missing: Verify asset paths and confirm that the referenced files are included in the portfolio directory.

Deployment fails: Review the GitHub Actions logs and confirm the Pages settings and workflow permissions.

Changes do not appear: Confirm that the latest workflow completed successfully and refresh the page.

9. Security Considerations

- Never commit passwords, API keys, or private credentials.
- Review the files being published because GitHub Pages websites are publicly accessible.
- Grant workflows only the permissions required for deployment.

10. Learning Outcomes

This task introduces repository organization, static website hosting, deployment automation, GitHub Actions, basic troubleshooting, and responsible handling of public website files.

References

- GitHub Pages documentation: https://docs.github.com/en/pages
- GitHub Actions documentation: https://docs.github.com/en/actions
- GitHub Pages site creation: https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site