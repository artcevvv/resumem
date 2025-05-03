import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

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
    padding: 40,
    fontFamily: 'Roboto',
  },
  header: {
    marginBottom: 30,
    borderBottom: '2pt solid #2c3e50',
    paddingBottom: 15,
  },
  name: {
    fontSize: 28,
    fontWeight: 700,
    color: '#2c3e50',
    marginBottom: 8,
    textAlign: 'center',
  },
  contact: {
    fontSize: 10,
    color: '#666666',
    marginBottom: 3,
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: '#2c3e50',
    marginBottom: 10,
    borderBottom: '1pt solid #e0e0e0',
    paddingBottom: 5,
  },
  summary: {
    fontSize: 11,
    lineHeight: 1.5,
    color: '#333333',
    textAlign: 'justify',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  skill: {
    fontSize: 10,
    backgroundColor: '#f8f9fa',
    padding: '4 8',
    borderRadius: 3,
    border: '1pt solid #e0e0e0',
  },
  experienceItem: {
    marginBottom: 15,
  },
  jobTitle: {
    fontSize: 13,
    fontWeight: 700,
    color: '#2c3e50',
    marginBottom: 3,
  },
  company: {
    fontSize: 11,
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
    textAlign: 'justify',
  },
  educationItem: {
    marginBottom: 15,
  },
  degree: {
    fontSize: 13,
    fontWeight: 700,
    color: '#2c3e50',
    marginBottom: 3,
  },
  school: {
    fontSize: 11,
    color: '#666666',
    marginBottom: 3,
  },
  twoColumns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftColumn: {
    width: '65%',
    paddingRight: 20,
  },
  rightColumn: {
    width: '35%',
  },
});

interface ResumeData {
  fullname: string;
  email: string;
  phone_number: string;
  summary: string;
  skills: Array<{ type: string; level: string }>;
  educations: Array<{
    school: string;
    degree: string;
    start_date: string;
    end_date: string;
    city: string;
    description: string;
  }>;
  careers: Array<{
    job_title: string;
    employer: string;
    start_date: string;
    end_date: string;
    city: string;
    description: string;
  }>;
  courses: Array<{
    name: string;
    url: string;
    start_date: string;
    end_date: string;
  }>;
}

const ProfessionalTemplate = ({ resume }: { resume: ResumeData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>{resume.fullname}</Text>
        <Text style={styles.contact}>{resume.email}</Text>
        <Text style={styles.contact}>{resume.phone_number}</Text>
      </View>

      <View style={styles.twoColumns}>
        {/* Left Column */}
        <View style={styles.leftColumn}>
          {/* Summary */}
          {resume.summary && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Professional Summary</Text>
              <Text style={styles.summary}>{resume.summary}</Text>
            </View>
          )}

          {/* Experience */}
          {resume.careers && resume.careers.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Professional Experience</Text>
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

        {/* Right Column */}
        <View style={styles.rightColumn}>
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
        </View>
      </View>
    </Page>
  </Document>
);

export default ProfessionalTemplate; 