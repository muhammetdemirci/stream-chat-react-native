import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import type { ExtendableGenerics } from 'stream-chat';

import { usePaginatedMessageListContext } from '../../contexts/paginatedMessageListContext/PaginatedMessageListContext';
import { useTheme } from '../../contexts/themeContext/ThemeContext';

import type { DefaultStreamChatGenerics } from '../../types/types';

const styles = StyleSheet.create({
  activityIndicatorContainer: {
    padding: 10,
    width: '100%',
  },
});

export type InlineLoadingMoreIndicatorPropsWithContext = {
  loadingMore?: boolean;
};

export const InlineLoadingMoreIndicatorWithContext: React.FC<InlineLoadingMoreIndicatorPropsWithContext> =
  ({ loadingMore }) => {
    const { theme } = useTheme();

    const {
      colors: { accent_blue },
    } = theme;

    if (!loadingMore) {
      return null;
    }

    return (
      <View style={styles.activityIndicatorContainer}>
        <ActivityIndicator color={accent_blue} size='small' />
      </View>
    );
  };

const areEqual = (
  prevProps: InlineLoadingMoreIndicatorPropsWithContext,
  nextProps: InlineLoadingMoreIndicatorPropsWithContext,
) => {
  const { loadingMore: prevLoadingMore } = prevProps;
  const { loadingMore: nextLoadingMore } = nextProps;

  const loadingMoreEqual = prevLoadingMore === nextLoadingMore;
  if (!loadingMoreEqual) return false;

  return true;
};

const MemoizedInlineLoadingMoreIndicator = React.memo(
  InlineLoadingMoreIndicatorWithContext,
  areEqual,
) as typeof InlineLoadingMoreIndicatorWithContext;

export const InlineLoadingMoreIndicator = <
  StreamChatClient extends ExtendableGenerics = DefaultStreamChatGenerics,
>() => {
  const { loadingMore } = usePaginatedMessageListContext<StreamChatClient>();

  return <MemoizedInlineLoadingMoreIndicator loadingMore={loadingMore} />;
};
