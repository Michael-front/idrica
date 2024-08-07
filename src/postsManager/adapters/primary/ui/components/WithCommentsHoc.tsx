import React from "react";
import { useGetCommentsByPostIdUsesCase } from "src/postsManager/core/application/usesCases/useGetCommentsByPostIdUsesCase";
import { PostCardProps } from "./PostCard";

const withComments = <P extends PostCardProps>(WrappedComponent: React.ComponentType<P>) => {
  const WithComments: React.FC<P> = (props) => {
    const { id, ...restProps } = props as P;

    const { comments, isLoading, isError } = useGetCommentsByPostIdUsesCase(id);

    return (
      <WrappedComponent {...(restProps as P)} id={id} comments={comments} isLoading={isLoading} isError={isError} />
    );
  };

  return React.memo(WithComments);
};

export default withComments;
