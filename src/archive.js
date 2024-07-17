             {
               orgs.map((org, index) => {
                return (
                <tr key={index + 1} className={styles.tr}>
                  <td style={{textAlign: 'center'}}>
                    { index + 1 }
                  </td>
                  <td>
                    <Link to='/app' className={styles.name}>
                      { org.name }
                    </Link>
                  </td>
                  <td>
                    { org.createdAt.split('T')[0] }
                  </td>
                  <td style={{
                    textAlign: 'center',
                    position: 'relative',
                  }}>
                    <ActionsMenu
                      updatePath={`/organizations/${org.id}/edit`}
                      deletePath={`/organizations/${org.id}/delete`}
                    />
                  </td>
                </tr>
                );
              })
            }
          {
            orgs.length === 0 &&
            <EmptyListPlaceholder listName='organization' />
          }
