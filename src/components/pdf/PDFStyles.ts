import { StyleSheet } from '@react-pdf/renderer';

export const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    borderBottom: 1,
    borderBottomColor: '#E5E7EB',
    paddingBottom: 12,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Helvetica-Bold',
    color: '#1E40AF',
  },
  subtitle: {
    fontSize: 10,
    color: '#6B7280',
    marginTop: 2,
  },
  mainContent: {
    flexDirection: 'row',
    gap: 15,
  },
  leftColumn: {
    width: '30%',
  },
  rightColumn: {
    width: '70%',
  },
  section: {
    marginBottom: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    padding: 12,
    border: '1pt solid #E5E7EB',
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 8,
    color: '#1F2937',
  },
  scoreSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    padding: 10,
    borderRadius: 4,
  },
  scoreValue: {
    fontSize: 24,
    fontFamily: 'Helvetica-Bold',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  categoryCard: {
    width: '48%',
    marginBottom: 8,
    padding: 10,
    backgroundColor: '#F9FAFB',
    borderRadius: 4,
    border: '1pt solid #E5E7EB',
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  categoryTitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: '#374151',
  },
  categoryScore: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
  },
  text: {
    fontSize: 9,
    lineHeight: 1.4,
    color: '#4B5563',
  },
  smallText: {
    fontSize: 8,
    color: '#6B7280',
    lineHeight: 1.3,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    color: '#9CA3AF',
    fontSize: 8,
    borderTop: '1pt solid #E5E7EB',
    paddingTop: 12,
  },
  badge: {
    paddingVertical: 1,
    paddingHorizontal: 4,
    borderRadius: 3,
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
  },
});