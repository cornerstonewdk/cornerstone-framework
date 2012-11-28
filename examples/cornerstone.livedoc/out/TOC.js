/**
 * Create a table of contents for this document, and insert the TOC into
 * the document by replacing the node specified by the replace argument.
 **/
function maketoc(replace) {
    // Create a <div> element that is the root of the TOC tree
    var toc = document.createElement("div");

    // Set a background color and font for the TOC.  We'll learn about
    // the style property in the next chapter
    toc.style.backgroundColor = "white";
    toc.style.fontFamily = "sans-serif";

    // Start the TOC with an anchor so we can link back to it.
    var anchor = document.createElement("a");  // Create an <a> node
    anchor.setAttribute("name", "TOC");        // Give it a name
    toc.appendChild(anchor);                   // And insert it

    // Make the body of the anchor the title of the TOC
    anchor.appendChild(document.createTextNode("Table Of Contents"));

    // Create a <table> element that will hold the TOC and add it 
    var table = document.createElement("table");
    toc.appendChild(table);

    // Create a <tbody> element that holds the rows of the TOC
    var tbody = document.createElement("tbody");
    table.appendChild(tbody);

    // Initialize an array that keeps track of section numbers
    var sectionNumbers = [0,0,0,0,0,0];

    // Recursively traverse the body of the document, looking for sections
    // marked with <h1>, <h2>, ... tags, and use them to create the TOC
    // by adding rows to the table.
    addSections(document.body, tbody, sectionNumbers);

    // Finally, insert the TOC into the document by replacing the node
    // specified by the replace argument with the TOC sub-tree
    replace.parentNode.replaceChild(toc, replace);

    // This method recursively traverses the tree rooted at node n, looking
    // for <h1> through <h6> tags and uses the content of these tags to build
    // the table of contents by adding rows to the HTML table specified by the
    // toc argument.  It uses the sectionNumbers array to keep track of the
    // current section number.
    // This function is defined inside of maketoc() so that it is not
    // visible from the outside.  maketoc() is the only function
    // exported by this JavaScript module.
    function addSections(n, toc, sectionNumbers) {
        // Loop through all the children of n
        for(var m = n.firstChild; m != null; m = m.nextSibling) {
        // Check whether m is a heading element.  It would be nice if we
            // could just use (m instanceof HTMLHeadingElement), but this is
            // not required by the specification and it does not work in IE.
            // Therefore we've got to check the tagname to see if it is H1-H6.
            if ((m.nodeType == 1) &&  /* Node.ELEMENT_NODE */ 
                (m.tagName.length == 2) && (m.tagName.charAt(0) == "H")) {
        // Figure out what level heading it is
                var level = parseInt(m.tagName.charAt(1));
                if (!isNaN(level) && (level >= 1) && (level <= 6)) {
            // Increment the section number for this heading level
            sectionNumbers[level-1]++;
            // And reset all lower heading level numbers to zero
            for(var i = level; i < 6; i++) sectionNumbers[i] = 0;
            // Now combine section numbers for all heading levels
            // to produce a section number like 2.3.1
            var sectionNumber = "";
            for(var i = 0; i < level; i++) {
            sectionNumber += sectionNumbers[i];
            if (i < level-1) sectionNumber += ".";
            }

            // Create an anchor to mark the beginning of this section.
            // This will be the target of a link we add to the TOC.
            var anchor = document.createElement("a");
            anchor.setAttribute("name", "SECT"+sectionNumber);

            // Create a link back to the TOC and make it a
            // child of the anchor
            var backlink = document.createElement("a");
            backlink.setAttribute("href", "#TOC");
            backlink.appendChild(document.createTextNode("Contents"));
            anchor.appendChild(backlink);

            // Insert the anchor into the document right before the
            // section header
            n.insertBefore(anchor, m);

            // Now create a link to this section.  It will be added
            // to the TOC below.
            var link = document.createElement("a");
            link.setAttribute("href", "#SECT" + sectionNumber);
            // Get the heading text using a function defined below
            var sectionTitle = getTextContent(m);
            // Use the heading text as the content of the link.
            link.appendChild(document.createTextNode(sectionTitle));

            // Create a new row for the TOC
            var row = document.createElement("tr");
            // Create two columns for the row
            var col1 = document.createElement("td");
            var col2 = document.createElement("td");
            // Make the first column right-aligned and put the section
            // number in it
            col1.setAttribute("align", "right");
            col1.appendChild(document.createTextNode(sectionNumber));
            // Put a link to the section in the second column
            col2.appendChild(link);
            // Add the columns to the row, and the row to the table
            row.appendChild(col1);
            row.appendChild(col2);
            toc.appendChild(row);

            // Modify the section header element itself to add
            // the section number as part of the section title
            m.insertBefore(document.createTextNode(sectionNumber+": "),
                   m.firstChild);
                }
            }
        else { // Otherwise, this is not a heading element, so recurse
        addSections(m, toc, sectionNumbers);
        }
        }
    }

    // This utility function traverses the node n, returning the content of
    // all text nodes found, and discarding any HTML tags.  This is also
    // defined as a nested function so that it is private to this module.
    function getTextContent(n) {
        var s = '';
        var children = n.childNodes;
        for(var i = 0; i < children.length; i++) {
            var child = children[i];
            if (child.nodeType == 3 /*Node.TEXT_NODE*/) s += child.data;
            else s += getTextContent(child);
        }
        return s;
    }
}

function maketocAtc(replace) {

    // ATCLONES
    $('#atclones').innerHTML  = "ATCLONES HIGH";

    // Create a <div> element that is the root of the TOC tree
    var toc = document.createElement("div");

    // Set a background color and font for the TOC.  We'll learn about
    // the style property in the next chapter
    toc.style.backgroundColor = "white";
    toc.style.fontFamily = "sans-serif";

    // Start the TOC with an anchor so we can link back to it.
    var anchor = document.createElement("a");  // Create an <a> node
    anchor.setAttribute("name", "TOC");        // Give it a name
    toc.appendChild(anchor);                   // And insert it

    // ATCLONES
    var p = document.createElement("p");
    p.innerHTML = "ATCLONES COME BACK";
    toc.appendChild(p);

    // Make the body of the anchor the title of the TOC
    anchor.appendChild(document.createTextNode("Table Of Contents"));

    // Create a <table> element that will hold the TOC and add it 
    var table = document.createElement("table");
    toc.appendChild(table);

    // Create a <tbody> element that holds the rows of the TOC
    var tbody = document.createElement("tbody");
    table.appendChild(tbody);

    // Initialize an array that keeps track of section numbers
    var sectionNumbers = [0,0,0,0,0,0];

    // Recursively traverse the body of the document, looking for sections
    // marked with <h1>, <h2>, ... tags, and use them to create the TOC
    // by adding rows to the table.
    //addSections(document.body, tbody, sectionNumbers);

    // Finally, insert the TOC into the document by replacing the node
    // specified by the replace argument with the TOC sub-tree
    replace.parentNode.replaceChild(toc, replace);
}
