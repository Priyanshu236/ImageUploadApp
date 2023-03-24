export default {
    name: 'pin',
    title: 'pin',
    type: 'document',
    fields:[
        {
            name: 'title',
            title: 'title',
            type: 'string'
        },
        {
            name:'category',
            title:'Category',
            type:'string'
        },
        {
            name: 'about',
            title: 'About',
            type: 'string'
        },
        {
            name: 'destination',
            type: 'url',
            title: 'Destination'
        },
        {
            name: 'image',
            title: 'Image',
            type: 'image',
            options:{
                hotspot: true
            }
        },
        {
            name: 'userId',
            title: 'UserId',
            type: 'string'
        },
        {
            name: 'postedBy',
            title: 'PostedBy',
            type: 'postedby'
        },
        {
            name: 'save',
            title: 'save',
            type: 'array',
            of: [{type: 'save'}]
        },
        {
            name: 'comments',
            title: 'Comments',
            type: 'array',
            of: [{type: 'comment'}]
        }

    ]
}