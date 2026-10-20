Cloud Deployment Guide — GitHub Pages

Project: Web Development Recruitment Portfolio
Platform: GitHub Pages
Automation: GitHub Actions
Repository: "aws-web-development-recruitment" (https://github.com/ompansare584-rgb/aws-web-development-recruitment)

1. Overview

This guide explains how to deploy the portfolio website in this repository using GitHub Pages and GitHub Actions.

The deployment workflow automatically publishes the contents of the "portfolio/" directory whenever new changes are pushed to the "main" branch. This provides a repeatable deployment process without requiring a separate hosting server.

2. Prerequisites

Before starting, ensure you have:

- A GitHub account.
- Git installed on your computer.
- Access to the project repository.
- A portfolio website containing an "index.html" file.

3. Repository Structure

The repository contains the following projects:

aws-web-development-recruitment/
├── portfolio/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── landing-clone/
├── todo-app/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── CLOUD_DEPLOYMENT_GUIDE.md
└── README.md

Note: The filenames shown inside "portfolio/" are examples. Adjust the structure if your actual files differ.

Only the "portfolio/" directory is published by the deployment workflow. The other projects remain in the repository and are not included in this deployment.

4. Enable GitHub Pages

1. Open the repository on GitHub.
2. Navigate to Settings → Pages.
3. Under Build and deployment, set Source to "GitHub Actions".
4. Save the setting if prompted.

This allows GitHub Actions to publish the website.

5. Configure the Deployment Workflow

Create the file ".github/workflows/deploy.yml" in the repository and add the following configuration:

name: Deploy Portfolio to GitHub Pages

'on':
  push:
    branches:
      - main
  workflow_dispatch:

permissions:
  contents: read

jobs:
  deploy:
    runs-on: ubuntu-latest

    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}

    permissions:
      contents: read
      pages: write
      id-token: write

    steps:
      - name: Checkout repository
        uses: actions/checkout@v5

      - name: Configure GitHub Pages
        uses: actions/configure-pages@v5

      - name: Upload portfolio files
        uses: actions/upload-pages-artifact@v4
        with:
          path: portfolio

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4

How the workflow works

1. Trigger: Runs when a commit is pushed to "main", or when manually started using "workflow_dispatch".
2. Checkout: Downloads the repository contents into the GitHub Actions runner.
3. Configure Pages: Prepares GitHub Pages deployment.
4. Upload artifact: Packages the contents of "portfolio/" for publishing.
5. Deploy: Publishes the artifact to GitHub Pages.

The workflow uses separate permissions for reading repository contents and publishing the Pages deployment.

6. Deploy Changes

Whenever you update your portfolio:

1. Save your changes.
2. Commit and push them to the "main" branch.
3. Open the repository's Actions tab.
4. Select the latest deployment run.
5. Confirm that the workflow completes successfully.

You can also run the workflow manually by opening the workflow in the Actions tab and selecting Run workflow, if that option is available.

7. Access the Deployed Website

After a successful deployment:

1. Open Settings → Pages.
2. Find the published website URL or select Visit site.
3. Open the link in your browser to verify the deployment.

The expected project URL for this repository is:

https://ompansare584-rgb.github.io/aws-web-development-recruitment/

Use the URL displayed in GitHub Pages as the authoritative link.

8. Troubleshooting

404 — Page Not Found

Check the following:

- Confirm that the Pages source is set to "GitHub Actions".
- Verify that "portfolio/index.html" exists in the repository.
- Ensure the filename is exactly "index.html", not "index.html.html".
- Confirm that the uploaded Pages artifact contains "index.html" at its top level.
- Check the latest workflow run and wait for deployment to finish.
- Open the published URL from Settings → Pages.

Workflow Failure

- Open Actions and select the failed run.
- Open the failed job and inspect the step marked with a red cross.
- Read the error message before changing the workflow configuration.
- Verify that the workflow file is located at ".github/workflows/deploy.yml".

Node.js or Ubuntu Runner Warnings

Deprecation and runner migration warnings do not necessarily mean the deployment failed. Check the actual job status and error messages. Update action versions when appropriate and supported by the relevant action documentation.

9. Verification Checklist

Before considering the deployment complete, verify that:

- [ ] GitHub Pages uses GitHub Actions as its source.
- [ ] The workflow completes successfully.
- [ ] The Pages artifact contains the portfolio files.
- [ ] "index.html" is correctly named and located.
- [ ] The published website opens successfully.
- [ ] A new commit triggers another deployment.
- [ ] The live URL is included in the repository README.

10. Conclusion

GitHub Pages and GitHub Actions provide a simple, automated way to host a static website. This deployment demonstrates source control, workflow automation, artifact publishing, deployment verification, and basic troubleshooting.

The same process can be reused whenever the portfolio is updated, making deployment more consistent and easier to reproduce.