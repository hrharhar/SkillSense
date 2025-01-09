import React from 'react';
import { Document, Page, View, Text } from '@react-pdf/renderer';
import { styles } from './PDFStyles';
import { Result } from '../../types';
import { getCategoryScores } from '../../utils/scoring';
import { getOverallAssessment } from '../../utils/assessmentFeedback';

interface ResultsPDFDocumentProps {
  result: Result;
  candidateInfo: {
    fullName: string;
    position: string;
  };
}

export const ResultsPDFDocument: React.FC<ResultsPDFDocumentProps> = ({ result, candidateInfo }) => {
  const categoryScores = getCategoryScores(result.answers);
  
  const getScoreColor = (score: number) => {
    if (score >= 83) return '#059669';
    if (score >= 67) return '#2563EB';
    if (score >= 50) return '#D97706';
    return '#DC2626';
  };

  const getScoreBadgeStyle = (score: number) => {
    if (score >= 83) return { backgroundColor: '#ECFDF5', color: '#059669' };
    if (score >= 67) return { backgroundColor: '#EFF6FF', color: '#2563EB' };
    if (score >= 50) return { backgroundColor: '#FFFBEB', color: '#D97706' };
    return { backgroundColor: '#FEF2F2', color: '#DC2626' };
  };

  const getScoreLabel = (score: number) => {
    if (score >= 83) return 'Excellent';
    if (score >= 67) return 'Good';
    if (score >= 50) return 'Fair';
    return 'Needs Work';
  };

  const truncateFeedback = (text: string, maxLength: number = 80) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Cognitive Canvas</Text>
            <Text style={styles.subtitle}>Assessment Results Report</Text>
          </View>
        </View>

        <View style={styles.mainContent}>
          <View style={styles.leftColumn}>
            <View style={styles.section}>
              <View style={styles.scoreSection}>
                <View>
                  <Text style={[styles.text, { fontFamily: 'Helvetica-Bold', fontSize: 11 }]}>
                    {candidateInfo.fullName}
                  </Text>
                  <Text style={styles.smallText}>{candidateInfo.position}</Text>
                  <Text style={styles.smallText}>
                    {new Date(result.completedAt).toLocaleDateString()}
                  </Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={[styles.scoreValue, { color: getScoreColor(result.score) }]}>
                    {result.score}%
                  </Text>
                  <View style={[styles.badge, getScoreBadgeStyle(result.score)]}>
                    <Text>{getScoreLabel(result.score)}</Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Overall Assessment</Text>
              <Text style={styles.text}>
                {truncateFeedback(getOverallAssessment(result.score), 250)}
              </Text>
            </View>
          </View>

          <View style={styles.rightColumn}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Category Performance</Text>
              <View style={styles.categoryGrid}>
                {categoryScores.map(({ category, score, description, feedback }) => (
                  <View key={category} style={styles.categoryCard}>
                    <View style={styles.categoryHeader}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.categoryTitle}>{category}</Text>
                        <Text style={styles.smallText}>{description}</Text>
                      </View>
                      <View style={{ alignItems: 'flex-end' }}>
                        <Text style={[styles.categoryScore, { color: getScoreColor(score) }]}>
                          {score}%
                        </Text>
                        <View style={[styles.badge, getScoreBadgeStyle(score)]}>
                          <Text>{getScoreLabel(score)}</Text>
                        </View>
                      </View>
                    </View>
                    <Text style={[styles.text, { marginTop: 4 }]}>
                      {truncateFeedback(feedback, 80)}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>

        <Text style={styles.footer}>
          © {new Date().getFullYear()} Cognitive Canvas • Assessment Results Report • Confidential
        </Text>
      </Page>
    </Document>
  );
};