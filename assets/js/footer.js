// Footer Loader - Dynamically loads footer HTML and CSS

// Determine base path based on current page location
const isSubPage = window.location.pathname.includes("/pages/");
const basePath = isSubPage ? "../" : "";
const partialsPath = basePath + "partials/footer.html";
const footerCSSPath = basePath + "partials/footer.css";

// Load footer CSS dynamically
const footerCSS = document.createElement("link");
footerCSS.rel = "stylesheet";
footerCSS.href = footerCSSPath;
document.head.appendChild(footerCSS);

// Load footer HTML
fetch(partialsPath)
    .then(response => response.text())
    .then(data => {
        document.getElementById("footer").innerHTML = data;

        // Rewrite links if on a sub-page
        if (isSubPage) {
            const footer = document.getElementById("footer");
            footer.querySelectorAll("a[href]").forEach(link => {
                const href = link.getAttribute("href");
                // Only rewrite relative paths (not external, not anchors, not tel:)
                if (href && !href.startsWith("http") && !href.startsWith("#") && !href.startsWith("tel:") && !href.startsWith("mailto:")) {
                    link.setAttribute("href", "../" + href);
                }
            });
            // Fix logo path
            const logo = footer.querySelector(".footer-logo img");
            if (logo) {
                logo.setAttribute("src", "../assets/images/logo.jpeg");
            }
        }
    })
    .catch(err => console.warn("Footer load failed:", err));
