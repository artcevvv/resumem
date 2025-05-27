import { Document, Page, Text, View, StyleSheet, Font, Link } from '@react-pdf/renderer';
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
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    fontFamily: 'Roboto',
  },
  sidebar: {
    width: '30%',
    backgroundColor: '#2c3e50',
    padding: 30,
    color: '#ffffff',
  },
  mainContent: {
    width: '70%',
    padding: 30,
  },
  header: {
    marginBottom: 30,
  },
  name: {
    fontSize: 24,
    fontWeight: 700,
    marginBottom: 10,
    color: '#ffffff',
  },
  contact: {
    fontSize: 10,
    color: '#e0e0e0',
    marginBottom: 5,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 700,
    color: '#ffffff',
    marginBottom: 10,
    borderBottom: '1pt solid #ffffff',
    paddingBottom: 5,
  },
  mainSectionTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: '#2c3e50',
    marginBottom: 10,
    borderBottom: '2pt solid #2c3e50',
    paddingBottom: 5,
  },
  summary: {
    fontSize: 11,
    lineHeight: 1.5,
    color: '#333333',
  },
  skillsContainer: {
    flexDirection: 'column',
    gap: 8,
  },
  skill: {
    fontSize: 10,
    color: '#ffffff',
    marginBottom: 5,
  },
  skillLevel: {
    fontSize: 9,
    color: '#e0e0e0',
  },
  experienceItem: {
    marginBottom: 20,
  },
  jobTitle: {
    fontSize: 14,
    fontWeight: 700,
    color: '#2c3e50',
    marginBottom: 3,
  },
  company: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 3,
  },
  date: {
    fontSize: 10,
    color: '#888888',
    marginBottom: 3,
  },
  description: {
    fontSize: 10,
    color: '#333333',
    marginTop: 5,
  },
  educationItem: {
    marginBottom: 15,
  },
  degree: {
    fontSize: 12,
    fontWeight: 700,
    color: '#ffffff',
    marginBottom: 3,
  },
  school: {
    fontSize: 10,
    color: '#e0e0e0',
    marginBottom: 3,
  },
  educationDate: {
    fontSize: 9,
    color: '#e0e0e0',
    marginBottom: 3,
  },
  links: {
    fontSize: 10,
    color: '#e0e0e0',
    marginBottom: 3,
    textAlign: 'left',
    wordBreak: 'break-all',
    maxWidth: '100%',
  },
});

interface CreativeTemplateProps {
  resume: ResumeData;
}

const CreativeTemplate = ({ resume }: CreativeTemplateProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Sidebar */}
      <View style={styles.sidebar}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{resume.fullname}</Text>
          <Text style={styles.contact}>{resume.email}</Text>
          <Text style={styles.contact}>{resume.phone_number}</Text>
        </View>

        {/* Skills */}
        {resume.skills && resume.skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={styles.skillsContainer}>
              {resume.skills.map((skill, index) => (
                <View key={index}>
                  <Text style={styles.skill}>{skill.type}</Text>
                  <Text style={styles.skillLevel}>{skill.level}</Text>
                </View>
              ))}
            </View>
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
                <Text style={styles.educationDate}>
                  {new Date(edu.start_date).toLocaleDateString()} - {edu.end_date ? new Date(edu.end_date).toLocaleDateString() : 'Present'}
                </Text>
                <Text style={styles.educationDate}>{edu.city}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Links */}
        {resume.links && resume.links.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Links</Text>
            {resume.links.map((link, index) => (
              <Link key={index} src={link.url} style={[styles.links, { color: '#4a90e2' }]}>
                {link.type}
              </Link>
            ))}
          </View>
        )}
      </View>

      {/* Main Content */}
      <View style={styles.mainContent}>
        {/* Summary */}
        {resume.summary && (
          <View style={styles.section}>
            <Text style={styles.mainSectionTitle}>Professional Summary</Text>
            <Text style={styles.summary}>{resume.summary}</Text>
          </View>
        )}

        {/* Experience */}
        {resume.careers && resume.careers.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.mainSectionTitle}>Experience</Text>
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
      </View>
    </Page>
  </Document>
);

export default CreativeTemplate; 