import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { ResumeData } from './types';

// Register fonts
Font.register({
  family: 'Roboto',
  fonts: [
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf', fontWeight: 300 },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf', fontWeight: 400 },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf', fontWeight: 500 },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf', fontWeight: 700 },
  ],
});

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 30,
    fontFamily: 'Roboto',
  },
  header: {
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 700,
    marginBottom: 5,
  },
  contact: {
    fontSize: 10,
    color: '#666666',
    marginBottom: 3,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 700,
    marginBottom: 8,
    color: '#2c3e50',
    borderBottom: '1pt solid #e0e0e0',
    paddingBottom: 4,
  },
  summary: {
    fontSize: 11,
    lineHeight: 1.4,
    color: '#333333',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skill: {
    fontSize: 10,
    backgroundColor: '#f0f0f0',
    padding: '4 8',
    borderRadius: 4,
  },
  experienceItem: {
    marginBottom: 12,
  },
  jobTitle: {
    fontSize: 12,
    fontWeight: 700,
    marginBottom: 2,
  },
  company: {
    fontSize: 11,
    color: '#666666',
    marginBottom: 2,
  },
  date: {
    fontSize: 10,
    color: '#888888',
    marginBottom: 2,
  },
  description: {
    fontSize: 10,
    color: '#333333',
    marginTop: 4,
  },
  educationItem: {
    marginBottom: 12,
  },
  degree: {
    fontSize: 12,
    fontWeight: 700,
    marginBottom: 2,
  },
  school: {
    fontSize: 11,
    color: '#666666',
    marginBottom: 2,
  },
});

interface ModernTemplateProps {
  resume: ResumeData;
}

const ModernTemplate = ({ resume }: ModernTemplateProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>{resume.fullname}</Text>
        <Text style={styles.contact}>{resume.email}</Text>
        <Text style={styles.contact}>{resume.phone_number}</Text>
      </View>

      {/* Summary */}
      {resume.summary && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Summary</Text>
          <Text style={styles.summary}>{resume.summary}</Text>
        </View>
      )}

      {/* Skills */}
      {resume.skills && resume.skills.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <View style={styles.skillsContainer}>
            {resume.skills.map((skill, index) => (
              <Text key={index} style={styles.skill}>
                {skill.type} ({skill.level})
              </Text>
            ))}
          </View>
        </View>
      )}

      {/* Experience */}
      {resume.careers && resume.careers.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experience</Text>
          {resume.careers.map((career, index) => (
            <View key={index} style={styles.experienceItem}>
              <Text style={styles.jobTitle}>{career.job_title}</Text>
              <Text style={styles.company}>{career.employer}</Text>
              <Text style={styles.date}>
                {new Date(career.start_date).toLocaleDateString()} - {career.end_date ? new Date(career.end_date).toLocaleDateString() : 'Present'}
              </Text>
              <Text style={styles.date}>{career.city}</Text>
              {career.description && <Text style={styles.description}>{career.description}</Text>}
            </View>
          ))}
        </View>
      )}

      {/* Education */}
      {resume.educations && resume.educations.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {resume.educations.map((edu, index) => (
            <View key={index} style={styles.educationItem}>
              <Text style={styles.degree}>{edu.degree}</Text>
              <Text style={styles.school}>{edu.school}</Text>
              <Text style={styles.date}>
                {new Date(edu.start_date).toLocaleDateString()} - {edu.end_date ? new Date(edu.end_date).toLocaleDateString() : 'Present'}
              </Text>
              <Text style={styles.date}>{edu.city}</Text>
              {edu.description && <Text style={styles.description}>{edu.description}</Text>}
            </View>
          ))}
        </View>
      )}
    </Page>
  </Document>
);

export default ModernTemplate; 