/* eslint-disable check-file/filename-naming-convention */
import { DocumentContext, DocumentProps, Head, Html, Main, NextScript } from "next/document";

import { DocumentHeadTags, DocumentHeadTagsProps, documentGetInitialProps } from "@mui/material-nextjs/v14-pagesRouter";

export default function MyDocument(props: DocumentProps & DocumentHeadTagsProps) {
    return (
        <Html lang="en">
            <Head>
                <link rel="shortcut icon" href="/assets/icons/favicon.ico" />
                <meta name="emotion-insertion-point" content="" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
                    rel="stylesheet"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
                    rel="stylesheet"
                />
                <DocumentHeadTags {...props} />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
    const finalProps = await documentGetInitialProps(ctx);
    return finalProps;
};
