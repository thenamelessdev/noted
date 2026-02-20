import Navbar from "@/components/navbar";
import "./global.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function RootLayout({children}: {children: React.ReactNode}){
    return(
        <html lang="en">
            <body>
                <Navbar/>
                <div className="stuff">
                    {children}
                </div>
            </body>
        </html>
    );
}