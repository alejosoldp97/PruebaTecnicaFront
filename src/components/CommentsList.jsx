import React from 'react'
import { ScrollArea } from '../src/components/ui/scroll-area'
import { Separator } from '../src/components/ui/separator'


const CommentsList = ({comments, earthquake}) => {
  return (
    <ScrollArea className="h-72 rounded-md border w-auto">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Comentarios del sismo {earthquake.title} </h4>
        {comments.map((comment) => (
          <>
            <div key={comment} className="text-sm">
              {comment}
            </div>
            <Separator className="my-2" />
          </>
        ))}
      </div>
    </ScrollArea>
  )
}

export default CommentsList