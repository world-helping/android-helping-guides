import type { ReactNode } from 'react';
import { Linking, StyleSheet, Text } from 'react-native';
import type { GuideStep } from '../lib/guides';
import { colors } from '../theme';

type StepTextProps = {
  step: GuideStep;
};

export function StepText({ step }: StepTextProps) {
  const { text, textLinks } = step;

  if (!textLinks?.length) {
    return <Text style={styles.text}>{text}</Text>;
  }

  const parts: ReactNode[] = [];
  let cursor = 0;

  for (const { match, href } of textLinks) {
    const index = text.indexOf(match, cursor);
    if (index === -1) continue;

    if (index > cursor) {
      parts.push(text.slice(cursor, index));
    }

    parts.push(
      <Text
        key={`${href}-${index}`}
        style={styles.link}
        onPress={() => Linking.openURL(href)}
      >
        {match}
      </Text>,
    );

    cursor = index + match.length;
  }

  if (cursor < text.length) {
    parts.push(text.slice(cursor));
  }

  return <Text style={styles.text}>{parts.length > 0 ? parts : text}</Text>;
}

const styles = StyleSheet.create({
  text: {
    flex: 1,
    paddingTop: 4,
    fontSize: 18,
    lineHeight: 28,
    color: colors.foreground,
  },
  link: {
    color: colors.accent,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});
