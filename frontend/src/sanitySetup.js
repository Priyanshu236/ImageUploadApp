import sanityClient from "@sanity/client"

import imageUrlBuilder from '@sanity/image-url'

// Get a pre-configured url-builder from your sanity client

// Then we like to make a simple function like this that gives the
// builder an image and returns the builder for you to specify additional
// parameters:
export const client= sanityClient({
    projectId: process.env.REACT_APP_ProjID,
    dataset: "production",
    useCdn: false,
    apiVersion: '2021-10-21',   
    token: process.env.REACT_APP_SANITY_TOKEN
});
const builder = imageUrlBuilder(client)
export const urfFor=(source)=> {
    return builder.image(source)
}