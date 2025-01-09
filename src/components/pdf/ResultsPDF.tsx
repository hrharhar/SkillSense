import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';
import { Result } from '../../types';
import { getCategoryFeedback, getOverallAssessment } from '../../utils/assessmentFeedback';

// Register fonts
Font.register({
  family: 'Inter',
  src: 'https://rsms.me/inter/font-files/Inter-Regular.woff2',
});

Font.register({
  family: 'InterBold',
  src: 'https://rsms.me/inter/font-files/Inter-Bold.woff2',
});

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Inter',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    borderBottom: '1 solid #E5E7EB',
    paddingBottom: 20,
  },
  logo: {
    width: 40,
    height: 40,
  },
  title: {
    fontSize: 24,
    fontFamily: 'InterBold',
    color: '#1E40AF',
  },
  subtitle: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'InterBold',
    marginBottom: 10,
    color: '#1F2937',
  },
  scoreCard: {
    backgroundColor: '#F3F4F6',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  scoreTitle: {
    fontSize: 14,
    fontFamily: 'InterBold',
    color: '#374151',
  },
  scoreValue: {
    fontSize: 20,
    fontFamily: 'InterBold',
    color: '#2563EB',
    marginTop: 5,
  },
  text: {
    fontSize: 12,
    lineHeight: 1.5,
    color: '#4B5563',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  categoryCard: {
    width: '48%',
    padding: 15,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    left: 40,
    right: 40,
    textAlign: 'center',
    color: '#9CA3AF',
    fontSize: 10,
    borderTop: '1 solid #E5E7EB',
    paddingTop: 20,
  },
});

interface ResultsPDFProps {
  result: Result;
  candidateInfo: {
    fullName: string;
    position: string;
  };
}

export const ResultsPDF: React.FC<ResultsPDFProps> = ({ result, candidateInfo }) => {
  const categories = [
    'Problem Solving',
    'Critical Thinking',
    'Communication',
    'Understanding Instructions',
    'Spatial Reasoning'
  ];

  const getCategoryScore = (category: string) => {
    // Calculate category score based on answers
    return Math.round(Math.random() * 40 + 60); // Placeholder calculation
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Cognitive Canvas</Text>
            <Text style={styles.subtitle}>Assessment Results</Text>
          </View>
          <Image
            src="/brain-icon.svg"
            style={styles.logo}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Candidate Information</Text>
          <View style={styles.scoreCard}>
            <Text style={styles.text}>Name: {candidateInfo.fullName}</Text>
            <Text style={styles.text}>Position: {candidateInfo.position}</Text>
            <Text style={styles.text}>Date: {new Date(result.completedAt).toLocaleDateString()}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Overall Performance</Text>
          <View style={styles.scoreCard}>
            <Text style={styles.scoreTitle}>Total Score</Text>
            <Text style={styles.scoreValue}>{result.score}%</Text>
          </View>
          <Text style={styles.text}>{getOverallAssessment(result.score)}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Category Breakdown</Text>
          <View style={styles.categoryGrid}>
            {categories.map(category => {
              const score = getCategoryScore(category);
              return (
                <View key={category} style={styles.categoryCard}>
                  <Text style={styles.scoreTitle}>{category}</Text>
                  <Text style={styles.scoreValue}>{score}%</Text>
                  <Text style={styles.text}>{getCategoryFeedback(category, score)}</Text>
                </View>
              );
            })}
          </View>
        </View>

        <Text style={styles.footer}>
          © {new Date().getFullYear()} Cognitive Canvas. All rights reserved.
        </Text>
      </Page>
    </Document>
  );
};