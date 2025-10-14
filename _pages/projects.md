---
layout: page
title: projects
permalink: /projects/
description: AI and machine learning research projects advancing healthcare and technology
nav: true
nav_order: 3
---

<!-- Featured Projects - Top 4 Most Important -->
<div class="projects">

  {% assign sorted_projects = site.projects | sort: "importance" %}

  {% for project in sorted_projects limit: 4 %}
    <div class="project-section">

      <h2>{{ project.title }}</h2>

      <p class="project-description"><em>{{ project.description }}</em></p>

      <div class="project-content">
        {{ project.content }}
      </div>

      {% if project.related_publications %}
        <div class="related-publications">
          <p><strong>📄 Related Publications:</strong> <a href="{{ '/publications/' | relative_url }}">View in Publications</a></p>
        </div>
      {% endif %}

    </div>
  {% endfor %}

</div>