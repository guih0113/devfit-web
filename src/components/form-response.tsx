import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface FormResponseProps {
  content: string
}

export function FormResponse({ content }: FormResponseProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ node, ...props }) => (
          <h1
            className="mt-8 mb-4 border-amber-300/20 border-b pb-2 font-bold text-2xl text-amber-300"
            {...props}
          />
        ),
        h2: ({ node, ...props }) => (
          <h2
            className="mt-6 mb-3 flex items-center gap-2 font-bold text-amber-300 text-xl"
            {...props}
          />
        ),
        h3: ({ node, ...props }) => (
          <h3
            className="mt-5 mb-2 font-bold text-lg text-white uppercase tracking-wider"
            {...props}
          />
        ),
        p: ({ node, ...props }) => (
          <p className="mb-4 text-neutral-300 leading-relaxed" {...props} />
        ),
        table: ({ node, ...props }) => (
          <div className="mb-6 overflow-x-auto rounded-lg border border-neutral-700">
            <table className="w-full border-collapse text-left" {...props} />
          </div>
        ),
        thead: ({ node, ...props }) => (
          <thead className="bg-neutral-800 text-amber-300" {...props} />
        ),
        th: ({ node, ...props }) => (
          <th className="border-neutral-700 border-b p-3 font-semibold text-sm" {...props} />
        ),
        td: ({ node, ...props }) => (
          <td className="border-neutral-800 border-b p-3 text-neutral-300 text-sm" {...props} />
        ),
        ul: ({ node, ...props }) => (
          <ul className="mb-4 list-none space-y-2 text-neutral-300" {...props} />
        ),
        ol: ({ node, ...props }) => (
          <ol className="mb-4 list-inside list-decimal space-y-2 text-neutral-300" {...props} />
        ),
        li: ({ node, ...props }) => (
          <li className="border-amber-300/30 border-l-2 py-1 pl-3 text-neutral-300" {...props} />
        ),
        strong: ({ node, ...props }) => <strong className="font-bold text-amber-300" {...props} />,
        em: ({ node, ...props }) => <em className="text-amber-200 italic" {...props} />,
        code: ({ node, ...props }) => (
          <code className="rounded bg-neutral-700 px-2 py-1 text-amber-300 text-xs" {...props} />
        )
      }}
    >
      {content}
    </ReactMarkdown>
  )
}
