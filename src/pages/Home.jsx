import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Home({ setScanResults }) {
  const [inputType, setInputType] = useState('file'); // 'file', 'git', or 'repo'
  const [file, setFile] = useState(null);
  const [gitLink, setGitLink] = useState('');
  const [repo, setRepo] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputTypeChange = (type) => {
    setInputType(type);
    setFile(null);
    setGitLink('');
    setRepo('');
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    let results = [];
    if (inputType === 'file' && file) {
      const formData = new FormData();
      formData.append('file', file);
      try {
        const response = await axios.post('http://localhost:8080/api/check/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        results = response.data;
      } catch (error) {
        console.error('Error:', error);
        alert('Failed to scan code.');
        setLoading(false);
        return;
      }
    } else if (inputType === 'git' && gitLink) {
      // Mock Git link scanning
      results = [{ issue: 'Mock issue from Git link', severity: 'LOW', suggestion: 'Mock suggestion', location: 'N/A' }];
    } else if (inputType === 'repo' && repo) {
      // Mock repo scanning
      results = [{ issue: 'Mock issue from repo', severity: 'MEDIUM', suggestion: 'Mock suggestion', location: 'N/A' }];
    } else {
      alert('Please provide an input!');
      setLoading(false);
      return;
    }

    setScanResults(results);
    setLoading(false);
    navigate('/results');
  };

  return (
    <div className="home-page">
      <h2>Upload Code for Scanning</h2>
      <div className="input-type-selector">
        <button
          className={inputType === 'file' ? 'active' : ''}
          onClick={() => handleInputTypeChange('file')}
        >
          File
        </button>
        <button
          className={inputType === 'git' ? 'active' : ''}
          onClick={() => handleInputTypeChange('git')}
        >
          Git Link
        </button>
        <button
          className={inputType === 'repo' ? 'active' : ''}
          onClick={() => handleInputTypeChange('repo')}
        >
          Repository
        </button>
      </div>

      <form onSubmit={handleSubmit} className="upload-form">
        {inputType === 'file' && (
          <input
            type="file"
            onChange={handleFileChange}
            accept=".java,.html"
            className="file-input"
          />
        )}
        {inputType === 'git' && (
          <input
            type="text"
            value={gitLink}
            onChange={(e) => setGitLink(e.target.value)}
            placeholder="Enter Git link"
            className="text-input"
          />
        )}
        {inputType === 'repo' && (
          <input
            type="text"
            value={repo}
            onChange={(e) => setRepo(e.target.value)}
            placeholder="Enter repository URL"
            className="text-input"
          />
        )}
        <button type="submit" disabled={loading} className="scan-button">
          {loading ? 'Scanning...' : 'Scan'}
        </button>
      </form>
    </div>
  );
}

export default Home;