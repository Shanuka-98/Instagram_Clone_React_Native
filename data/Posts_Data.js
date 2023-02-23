import { users } from "./Users";

export const POSTS = [
    {
        wallImage: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
        user: users[1].user,
        likes: 512,
        caption: '“I have studied many philosophers and many cats. The wisdom of cats is infinitely superior.”\n– Hippolyte Taine',	
        profile_picture: users[1].avatar,
        comments : [
            {
                user: 'jack_12',
                comment: 'This is a great photo. I love it',
            },

            {
                user: 'jane_98',
                comment: 'This is nice!',
            },
        ],


    },

    {
        wallImage: 'https://img.freepik.com/premium-photo/beautiful-asian-woman-drinking-coffee-home-morning-sitting-bed-window-smiling-relaxing_34670-1244.jpg?w=1060',
        user: users[2].user,
        likes: 700,
        caption: 'amazing day',
        profile_picture: users[2].avatar,
        comments : [
            {
                user: 'charly_11',
                comment: 'This is a great photo. I love it',
            },

        ],
    },
]