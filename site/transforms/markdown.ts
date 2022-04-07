import { marked } from "https://unpkg.com/marked@4.0.0/lib/marked.esm.js";
import { tw } from "https://cdn.skypack.dev/twind@0.16.16?min";

marked.setOptions({
  gfm: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: true,
});

// Add example classes to Twind
// TODO: It would be good to capture these directly from examples
tw(
  "btn btn-muted hidden bg-red-400 bg-gray-400 ml-2 p-2 flex flex-row justify-between cursor-pointer space-y-2",
);

function transformMarkdown(input: string) {
  // https://github.com/markedjs/marked/issues/545
  const tableOfContents: { slug: string; level: number; text: string }[] = [];

  // https://marked.js.org/using_pro#renderer
  // https://github.com/markedjs/marked/blob/master/src/Renderer.js
  marked.use({
    renderer: {
      paragraph(text: string) {
        return '<p class="' + tw("my-2") + '">' + text + "</p>";
      },
      heading(
        text: string,
        level: number,
        raw: string,
        slugger: { slug: (s: string) => string },
      ) {
        const slug = slugger.slug(raw);

        tableOfContents.push({ slug, level, text });

        const classes = {
          1: "inline-block underline text-gray-900 font-extrabold leading-3 text-3xl mt-0 mb-8",
          2: "inline-block underline text-gray-900 font-bold leading-4 text-xl mt-4 mb-2",
          3: "inline-block underline text-gray-900 font-semibold leading-5 text-lg mt-1 mb-1",
          4: "inline-block underline text-gray-900 font-medium leading-6 mt-1 mb-0.5",
        };

        return (
          '<a class="' +
          tw(classes[level]) +
          '" href="#' +
          slug +
          '"><h' +
          level +
          ' class="' +
          tw`inline` +
          '"' +
          ' id="' +
          slug +
          '">' +
          text +
          "</h" +
          level +
          ">" +
          "</a>\n"
        );
      },
      link(href: string, title: string, text: string) {
        if (href === null) {
          return text;
        }
        let out = '<a class="' + tw`underline` + '" href="' + href + '"';
        if (title) {
          out += ' title="' + title + '"';
        }
        out += ">" + text + "</a>";
        return out;
      },
      list(body: string, ordered: string, start: number) {
        const type = ordered ? "ol" : "ul",
          startatt = ordered && start !== 1 ? ' start="' + start + '"' : "",
          klass = ordered
            ? "list-decimal list-outside my-2"
            : "list-disc list-outside my-2";
        return (
          "<" +
          type +
          startatt +
          ' class="' +
          tw(klass) +
          '">\n' +
          body +
          "</" +
          type +
          ">\n"
        );
      },
    },
  });

  return { content: marked(input), tableOfContents };
}

export default transformMarkdown;
