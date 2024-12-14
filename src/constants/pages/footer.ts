import { FooterItem, SocialItem } from "~/types/pages/footer";

export const FOOTER_ITEMS: { title: string; items: FooterItem[] }[] = [
    {
        title: "Account",
        items: [
            { name: "My Account", url: "#" },
            { name: "Login / Register", url: "#" },
            { name: "Cart", url: "#" },
            { name: "Wishlist", url: "#" },
            { name: "Shop", url: "#" }
        ]
    },
    {
        title: "Quick Link",
        items: [
            { name: "Privacy Policy", url: "#" },
            { name: "Terms Of Use", url: "#" },
            { name: "FAQ", url: "#" },
            { name: "Contact", url: "#" }
        ]
    }
];

export const SOCIALS: SocialItem[] = [
    {
        imgSrc: "/assets/icons/facebook.svg",
        imgAlt: "facebook icon"
    },
    {
        imgSrc: "/assets/icons/instagram.svg",
        imgAlt: "instagram icon"
    },
    {
        imgSrc: "/assets/icons/twitter.svg",
        imgAlt: "twitter icon"
    },
    {
        imgSrc: "/assets/icons/youtube.svg",
        imgAlt: "youtube icon"
    }
];
