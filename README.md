# dotdigital PWA Toolkit
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](LICENSE.md)

This repository provides a starting point for merchants and developers wishing to integrate features from our existing Magento modules into a [Venia storefront](https://github.com/magento/pwa-studio#venia) project.

Our extensions are only compatible with Venia; however, we hope they offer useful examples to developers integrating into other kinds of PWA frameworks. 

So far, we’ve demonstrated how to integrate Chat, Tracking and Email Capture (see [Our extensions](#our-extensions) below). Future releases will deliver additional packages.  

## Setup

As a minimum, you will need:

- a functioning Venia storefront, installed as per Magento’s [instructions](https://magento.github.io/pwa-studio/tutorials/)
- a Magento instance with the dotdigital integration enabled
- to install one or more of our Magento GraphQl modules (see below)

## Using our extensions

Our extensions are published separately to [NPM](https://www.npmjs.com/org/dotdigital). If you wish to use our code as is, you can add these extensions using yarn, for example:

    yarn add @dotdigital/pwa-studio-tracking

### Overriding Venia

In our extensions, we’ve used PWA Studio’s [Targets and Targetables](https://magento.github.io/pwa-studio/pwa-buildpack/extensibility-framework/) to demonstrate how to extend your storefront using our code. We’ve made certain decisions about how to target and override the Venia component tree. If these don’t suit your project, you can copy our code and use pieces of it as you need.

### GraphQl
    
We have two GraphQl modules that support our extensions: 

- [dotmailer/dotmailer-magento2-extension-graph-ql](https://github.com/dotmailer/dotmailer-magento2-extension-graph-ql/) (required for tracking and email-capture)
- [dotmailer/dotmailer-magento2-extension-chat-graph-ql](https://github.com/dotmailer/dotmailer-magento2-extension-chat-graph-ql/) (required for chat)


## Our extensions

### Chat
@dotdigital/chat adds:

- a component to deliver the chat widget
- a sign-in wrapper to update the chat profile after a customer signs in to their account 

The widget will only display if Chat is enabled in Magento.

### Email Capture
@dotdigital/email-capture adds:

- a `NewsletterSignup` component. This subscribes email addresses exactly as per regular Magento; our module in Magento picks up the submission and handles the data from there. If a guest cart exists, we’ll attempt to update the quote table with the email address at submit.
- a `handleBlur` prop for the `GuestForm` component. This adds an onBlur handler to capture an email address at guest checkout.

Easy Email Capture in both contexts respects the settings in **Stores > Configuration > dotdigital > Configuration > Abandoned Carts**.

### Tracking
Our @dotdigital/pwa-studio-tracking extension will add the following types of tracking:

- Page Tracking
- ROI Tracking
- Web Behavior Tracking

Tracking scripts will only be added if the required configuration settings are enabled in Magento (see **Stores > Configuration > dotdigital > Configuration > Tracking**).

[User identification](https://support.dotdigital.com/hc/en-gb/articles/219045108-Install-Web-behavior-tracking) is currently implemented in the @dotdigital/pwa-studio-email-capture extension. 


## Contribution

We welcome contributions to this toolkit. You may wish to:

- [Report a bug](https://github.com/dotmailer/ec-magento-pwa-toolkit/issues): create a GitHub issue including description, repro steps, Magento and extension version numbers
- [Fix a bug](https://github.com/dotmailer/ec-magento-pwa-toolkit/pulls): please clone and use our develop branch to submit your pull request
- Request a feature on our [roadmap](https://r1.dotdigital-pages.com/p/35E-386/the-engagement-cloud-roadmap)
