import { useState } from "react";
import {
  Search,
  Plus,
  Wifi,
  Monitor,
  ShieldCheck,
  Printer,
  ChevronRight,
  Eye,
  Clock,
  BookOpen,
  ArrowLeft,
  Sparkles,
} from "lucide-react";

import "./KnowledgeBase.css";

const categories = [
  {
    name: "Network",
    count: 24,
    icon: Wifi,
  },
  {
    name: "Software",
    count: 18,
    icon: Monitor,
  },
  {
    name: "Security",
    count: 12,
    icon: ShieldCheck,
  },
  {
    name: "Hardware",
    count: 15,
    icon: Printer,
  },
];

const articles = [
  {
    id: 1,
    title: "How to connect to company Wi-Fi",
    description:
      "Step-by-step guide for connecting your device to the company network.",
    category: "Network",
    views: 324,
    updated: "2 days ago",
  },
  {
    id: 2,
    title: "Reset your account password",
    description:
      "Learn how to securely reset your account password when you cannot sign in.",
    category: "Security",
    views: 218,
    updated: "5 days ago",
  },
  {
    id: 3,
    title: "Printer troubleshooting guide",
    description:
      "Common solutions for printers that are offline, unavailable, or not printing.",
    category: "Hardware",
    views: 186,
    updated: "1 week ago",
  },
  {
    id: 4,
    title: "Install approved software",
    description:
      "Learn how to install company-approved applications on your computer.",
    category: "Software",
    views: 154,
    updated: "1 week ago",
  },
];

function KnowledgeBase() {
  const [search, setSearch] = useState("");
  const [selectedArticle, setSelectedArticle] = useState(null);

  const filteredArticles = articles.filter((article) =>
    `${article.title} ${article.description} ${article.category}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  if (selectedArticle) {
    return (
      <div className="knowledge-page">
        <button
          className="back-button"
          onClick={() => setSelectedArticle(null)}
        >
          <ArrowLeft size={18} />
          Back to Knowledge Base
        </button>

        <div className="article-page">
          <div className="article-header">
            <div>
              <span className="article-category">
                {selectedArticle.category}
              </span>

              <h1>{selectedArticle.title}</h1>

              <p>{selectedArticle.description}</p>

              <div className="article-meta">
                <span>
                  <Eye size={16} />
                  {selectedArticle.views} views
                </span>

                <span>
                  <Clock size={16} />
                  Updated {selectedArticle.updated}
                </span>
              </div>
            </div>
          </div>

          <div className="article-content">
            <h2>Overview</h2>

            <p>
              Follow the steps below to troubleshoot this issue and get your
              system working again.
            </p>

            <h2>Steps</h2>

            <div className="step">
              <div className="step-number">01</div>
              <div>
                <h3>Open your settings</h3>
                <p>
                  Open the relevant settings on your computer or device.
                </p>
              </div>
            </div>

            <div className="step">
              <div className="step-number">02</div>
              <div>
                <h3>Check the required option</h3>
                <p>
                  Select the appropriate option and check your current
                  configuration.
                </p>
              </div>
            </div>

            <div className="step">
              <div className="step-number">03</div>
              <div>
                <h3>Apply the changes</h3>
                <p>
                  Save the changes and test the system again.
                </p>
              </div>
            </div>
          </div>

          <button className="ask-ai-button">
            <Sparkles size={18} />
            Ask AI about this article
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="knowledge-page">
      {/* Header */}
      <div className="knowledge-header">
        <div>
          <div className="title-row">
            <BookOpen size={28} />
            <h1>Knowledge Base</h1>
          </div>

          <p>
            Find answers, guides, and troubleshooting resources.
          </p>
        </div>

        <button className="new-article-button">
          <Plus size={18} />
          New Article
        </button>
      </div>

      {/* Search */}
      <div className="knowledge-search">
        <Search size={20} />
        <input
          type="text"
          placeholder="Search knowledge articles..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Categories */}
      <section>
        <div className="section-title">
          <h2>Categories</h2>
        </div>

        <div className="category-grid">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <div className="category-card" key={category.name}>
                <div className="category-icon">
                  <Icon size={22} />
                </div>

                <div>
                  <h3>{category.name}</h3>
                  <p>{category.count} articles</p>
                </div>

                <ChevronRight className="category-arrow" size={19} />
              </div>
            );
          })}
        </div>
      </section>

      {/* Articles */}
      <section className="articles-section">
        <div className="section-title">
          <div>
            <h2>Popular Articles</h2>
            <p>Frequently used troubleshooting guides</p>
          </div>

          <span className="article-count">
            {filteredArticles.length} articles
          </span>
        </div>

        <div className="article-list">
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article) => (
              <div
                className="knowledge-article"
                key={article.id}
                onClick={() => setSelectedArticle(article)}
              >
                <div className="article-main">
                  <span className="small-category">
                    {article.category}
                  </span>

                  <h3>{article.title}</h3>

                  <p>{article.description}</p>

                  <div className="article-stats">
                    <span>
                      <Eye size={15} />
                      {article.views} views
                    </span>

                    <span>
                      <Clock size={15} />
                      Updated {article.updated}
                    </span>
                  </div>
                </div>

                <ChevronRight className="article-arrow" size={22} />
              </div>
            ))
          ) : (
            <div className="no-results">
              <Search size={30} />
              <h3>No articles found</h3>
              <p>Try searching with another keyword.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default KnowledgeBase;