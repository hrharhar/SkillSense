import React from 'react';
import { Document, Page, View, Text } from '@react-pdf/renderer';
import { Result } from '../../types';
import { styles } from '../pdf/PDFStyles';
import { calculateCategoryScore, getStatusStyle, getStatusText } from '../../utils/scoreCalculations';

interface AdminResultsPDFProps {
  results: Result[];
}

export const AdminResultsPDF: React.FC<AdminResultsPDFProps> = ({ results }) => {
  const getAverageScore = () => {
    if (results.length === 0) return 0;
    const totalScore = results.reduce((sum, result) => sum + result.score, 0);
    return Math.round(totalScore / results.length);
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Cognitive Canvas</Text>
            <Text style={styles.subtitle}>Assessment Results Summary</Text>
          </View>
        </View>

        <View style={styles.summary}>
          <Text style={styles.summaryText}>Total Assessments: {results.length}</Text>
          <Text style={styles.summaryText}>Average Score: {getAverageScore()}%</Text>
          <Text style={styles.summaryText}>Report Generated: {new Date().toLocaleDateString()}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Detailed Results</Text>
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={[styles.tableCell, styles.tableCellHeader]}>Candidate Name</Text>
              <Text style={[styles.tableCell, styles.tableCellHeader]}>Position</Text>
              <Text style={[styles.tableCell, styles.tableCellHeader, styles.scoreCell]}>Score</Text>
              <Text style={[styles.tableCell, styles.tableCellHeader]}>Date</Text>
              <Text style={[styles.tableCell, styles.tableCellHeader]}>Status</Text>
            </View>

            {results.map((result, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCell}>{result.userId}</Text>
                <Text style={styles.tableCell}>{result.assessmentId}</Text>
                <Text style={[styles.tableCell, styles.scoreCell]}>{result.score}%</Text>
                <Text style={styles.tableCell}>
                  {new Date(result.completedAt).toLocaleDateString()}
                </Text>
                <Text style={[styles.tableCell, styles[getStatusStyle(result.score)]]}>
                  {getStatusText(result.score)}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <Text style={styles.footer}>
          © {new Date().getFullYear()} Cognitive Canvas. All rights reserved.
        </Text>
      </Page>
    </Document>
  );
};